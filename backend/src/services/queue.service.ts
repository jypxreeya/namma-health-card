import { Queue, Worker, Job } from 'bullmq';
import { cacheService } from './cache.service';

// 1. Define Queues
export const notificationQueue = new Queue('notifications', {
  connection: (cacheService as any).redis || { host: 'localhost', port: 6379 }
});

export const reportQueue = new Queue('reports', {
  connection: (cacheService as any).redis || { host: 'localhost', port: 6379 }
});

// 2. Worker Implementation
if (process.env.RUN_WORKERS === 'true') {
  const notificationWorker = new Worker('notifications', async (job: Job) => {
    console.log(`Processing notification job ${job.id}:`, job.data);
    // Simulate sending WhatsApp/SMS
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, { connection: (cacheService as any).redis || { host: 'localhost', port: 6379 } });

  const reportWorker = new Worker('reports', async (job: Job) => {
    console.log(`Processing report job ${job.id}:`, job.data);
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
  }, { connection: (cacheService as any).redis || { host: 'localhost', port: 6379 } });

  notificationWorker.on('completed', (job) => console.log(`Job ${job.id} completed`));
  notificationWorker.on('failed', (job, err) => console.error(`Job ${job?.id} failed`, err));
}
