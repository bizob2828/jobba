import * as Bull from 'bull';

interface JobbaConfig {}

export default class Jobba {
	config: JobbaConfig;
	queues: Map<string, Bull.Queue>;

	constructor(config) {
		this.config = config;
		this.queues = new Map();
	}

	register(id: string, fn: (job: Bull.Job) => Promise<any>, options?: Bull.QueueOptions) {
		const queue = new Bull(id, options);
		this.queues.set(id, queue);
		queue.process(fn);
	}

	schedule(id: string, data: any, options?: Bull.JobOptions) {
		this.queues.get(id).add(data, options);
	}
}
