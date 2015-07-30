let jobs = [
  { label: 'A', submittedTime: 0, length: 10 },
  { label: 'B', submittedTime: 2, length: 12 },
  { label: 'C', submittedTime: 3, length: 3 },
  { label: 'D', submittedTime: 6, length: 1 },
  { label: 'E', submittedTime: 9, length: 15 },
];

let cpu = '';

let startTimes = {};

let currentJobIndex = null;
let queue = [];

const quantumLength = 2;
let currentQuantumRemaining = 0;
let time = 0;

let tick = function() {
  console.log('Time = ' + time);

  jobs.forEach(job => {
    if (job.submittedTime === time) {
      console.log(`Queueing job ${job.label}`);
      queue.splice(currentJobIndex, 0, job);
      job.startTime = null;
      job.endTime = null;
      job.waitingTime = 0;
      job.turnaroundTime = 0;

      currentJobIndex = currentJobIndex === null ? 0 : currentJobIndex + 1;
    }
  });

  if (currentQuantumRemaining === 0) {
    currentJobIndex = queue.length === 0 ? null : (currentJobIndex + 1) % queue.length;
    currentQuantumRemaining = quantumLength;
  }

  if (currentJobIndex === null) {
    ++time;
    return;
  }

  let currentJob = queue[currentJobIndex];
  if (currentJob.startTime === null) {
    currentJob.startTime = time;
    currentJob.waitingTime = currentJob.startTime - currentJob.submittedTime;
  }

  console.log(`Executing job ${currentJob.label}`);
  console.log(currentJob);
  cpu += currentJob.label;
  --currentJob.length;
  --currentQuantumRemaining;
  ++time;
  if (currentJob.length === 0) {
    // Delete the job
    currentJob.endTime = time;
    currentJob.turnaroundTime = currentJob.endTime - currentJob.submittedTime;
    queue.splice(currentJobIndex, 1);
    --currentJobIndex;
    currentQuantumRemaining = 0;
  }
};

while (time === 0 || queue.length > 0) {
  tick();
}

jobs.forEach(job => {
  console.log(`Job ${job.label}: start time = ${job.startTime}, end time = ${job.endTime}, waiting time = ${job.waitingTime}, turnaround time = ${job.turnaroundTime}`);
});

console.log(cpu);
