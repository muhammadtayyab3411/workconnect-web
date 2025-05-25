/**
 * Demo: Job Management Integration with Frontend
 * 
 * This script demonstrates how the WorkConnect frontend can integrate
 * with the backend Job Management CRUD API we've implemented.
 */

import { jobAPI, authAPI } from './lib/api.js';

class JobManagementDemo {
  constructor() {
    this.currentUser = null;
    this.accessToken = null;
  }

  async initialize() {
    console.log('🚀 Initializing Job Management Demo...\n');
    
    // 1. Authenticate user
    await this.authenticateUser();
    
    // 2. Load job categories for dropdown/filter options
    await this.loadJobCategories();
    
    // 3. Demonstrate job listing with filters
    await this.demonstrateJobListing();
    
    // 4. Show job creation workflow (for clients)
    await this.demonstrateJobCreation();
    
    // 5. Show job management actions
    await this.demonstrateJobActions();
    
    console.log('\n✅ Job Management Demo completed successfully!');
  }

  async authenticateUser() {
    console.log('🔐 Step 1: User Authentication');
    try {
      const loginData = await authAPI.login({
        email: 'tayyab1@example.com',
        password: 'testpass123'
      });
      
      this.currentUser = loginData.user;
      this.accessToken = loginData.tokens.access;
      
      console.log(`✅ Logged in as: ${this.currentUser.full_name} (${this.currentUser.role})`);
      console.log(`📧 Email: ${this.currentUser.email}\n`);
    } catch (error) {
      console.error('❌ Authentication failed:', error.message);
      throw error;
    }
  }

  async loadJobCategories() {
    console.log('📂 Step 2: Loading Job Categories');
    try {
      const categories = await jobAPI.getCategories();
      console.log(`✅ Loaded ${categories.length} job categories:`);
      
      categories.slice(0, 5).forEach(category => {
        console.log(`   • ${category.name} (${category.slug})`);
      });
      console.log(`   • ... and ${categories.length - 5} more categories\n`);
      
      return categories;
    } catch (error) {
      console.error('❌ Failed to load categories:', error.message);
      throw error;
    }
  }

  async demonstrateJobListing() {
    console.log('📋 Step 3: Job Listing and Filtering');
    
    try {
      // Get all jobs
      console.log('   Loading all available jobs...');
      const allJobs = await jobAPI.getJobs();
      console.log(`   ✅ Found ${allJobs.length} total jobs`);

      // Filter by urgent jobs
      console.log('   Filtering urgent jobs...');
      const urgentJobs = await jobAPI.getJobs({ urgent: true });
      console.log(`   ✅ Found ${urgentJobs.length} urgent jobs`);

      // Filter by category
      console.log('   Filtering cleaning jobs...');
      const cleaningJobs = await jobAPI.getJobs({ category: 'cleaning' });
      console.log(`   ✅ Found ${cleaningJobs.length} cleaning jobs`);

      // Search jobs
      console.log('   Searching for "plumber" jobs...');
      const searchResults = await jobAPI.searchJobs('plumber');
      console.log(`   ✅ Found ${searchResults.length} jobs matching "plumber"`);

      if (allJobs.length > 0) {
        const sampleJob = allJobs[0];
        console.log(`   📄 Sample job: "${sampleJob.title}" in ${sampleJob.city}`);
        console.log(`   💰 Budget: ${sampleJob.budget_display}`);
        console.log(`   ⏰ Posted: ${sampleJob.posted_time_ago}\n`);
      }
    } catch (error) {
      console.error('❌ Job listing failed:', error.message);
    }
  }

  async demonstrateJobCreation() {
    console.log('✏️ Step 4: Job Creation (Client Feature)');
    
    if (this.currentUser.role !== 'client') {
      console.log('   ℹ️ Skipping job creation (user is not a client)\n');
      return;
    }

    try {
      // Get categories for job creation
      const categories = await jobAPI.getCategories();
      const cleaningCategory = categories.find(cat => cat.slug === 'cleaning');

      const newJobData = {
        title: 'Demo: House Cleaning Service Needed',
        description: 'This is a demo job created to show the job creation workflow. Need professional house cleaning service for a 3-bedroom home. Regular weekly cleaning required with attention to detail.',
        category: cleaningCategory.id,
        job_type: 'recurring',
        urgent: false,
        address: '123 Demo Street, Demo City, DC 12345',
        city: 'Demo City',
        payment_type: 'hourly',
        budget: 30.00,
        experience_level: 'experienced',
        duration: '4-8-hours',
        flexible_schedule: true,
        special_requirements: 'Must bring own cleaning supplies. Pet-friendly cleaning products preferred.'
      };

      console.log('   Creating new job...');
      const createResponse = await jobAPI.createJob(newJobData);
      const createdJob = createResponse.job;
      
      console.log(`   ✅ Job created successfully!`);
      console.log(`   📄 Job ID: ${createdJob.id}`);
      console.log(`   📝 Title: ${createdJob.title}`);
      console.log(`   🏷️ Status: ${createdJob.status_display}`);
      console.log(`   💰 Budget: ${createdJob.budget_display}\n`);

      // Clean up the demo job
      console.log('   🧹 Cleaning up demo job...');
      await jobAPI.deleteJob(createdJob.id);
      console.log('   ✅ Demo job cleaned up\n');

    } catch (error) {
      console.error('❌ Job creation failed:', error.message);
    }
  }

  async demonstrateJobActions() {
    console.log('⚡ Step 5: Job Management Actions');
    
    try {
      // Get user's own jobs (if client)
      if (this.currentUser.role === 'client') {
        const myJobs = await jobAPI.getJobs();
        console.log(`   📊 You have ${myJobs.length} posted jobs`);
        
        if (myJobs.length > 0) {
          const sampleJob = myJobs[0];
          console.log(`   📄 Sample job: "${sampleJob.title}"`);
          console.log(`   📈 Status: ${sampleJob.status}`);
          
          // Demonstrate job detail view
          const jobDetails = await jobAPI.getJob(sampleJob.id);
          console.log(`   👁️ Job views: ${jobDetails.views_count}`);
          console.log(`   📝 Applications: ${jobDetails.applications_count}`);
        }
      } else {
        console.log('   👔 As a worker, you can browse and apply to jobs');
        const availableJobs = await jobAPI.getJobs({ status: 'open' });
        console.log(`   📋 ${availableJobs.length} jobs available for applications`);
      }

      console.log('   ✅ Job management actions demonstrated\n');
    } catch (error) {
      console.error('❌ Job actions failed:', error.message);
    }
  }
}

// Frontend Integration Examples
export const JobManagementIntegration = {
  // Example: Load jobs for job listing page
  async loadJobsForListing(filters = {}) {
    try {
      const jobs = await jobAPI.getJobs(filters);
      return {
        success: true,
        data: jobs,
        message: `Loaded ${jobs.length} jobs`
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.message
      };
    }
  },

  // Example: Load job categories for filters/dropdowns
  async loadCategoriesForFilters() {
    try {
      const categories = await jobAPI.getCategories();
      return categories.map(cat => ({
        value: cat.slug,
        label: cat.name,
        icon: cat.icon
      }));
    } catch (error) {
      console.error('Failed to load categories:', error);
      return [];
    }
  },

  // Example: Handle job posting form submission
  async handleJobPostingSubmission(formData) {
    try {
      const result = await jobAPI.createJob(formData);
      return {
        success: true,
        job: result.job,
        message: result.message
      };
    } catch (error) {
      return {
        success: false,
        errors: error.response?.data || { general: error.message }
      };
    }
  },

  // Example: Load job details for job detail page
  async loadJobDetails(jobId) {
    try {
      const job = await jobAPI.getJob(jobId);
      return {
        success: true,
        job,
        canEdit: false, // This would be determined by checking if current user is the job owner
        canApply: true  // This would be determined by user role and job status
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};

// Run demo if called directly
if (typeof window === 'undefined') {
  // Running in Node.js for testing
  const demo = new JobManagementDemo();
  demo.initialize().catch(console.error);
}

export default JobManagementDemo; 