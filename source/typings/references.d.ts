// TSD references
/// <reference path="tsd.d.ts" />

// Our references:
// declare function andrei(): string;

declare interface ITargetService {
    getTargets(): Array<Target>;
    addTarget(target: Target);
}

declare class Target {
    name: string;
    status: Status;
    taskList: Array<Task>;
    doneTasks(): number;
    allTasks(): number;
    addTask(task: Task);
    progress(): number;
    constructor(name: string);
}

declare class Status {
    status: number;
    inProgress(): boolean;
    isDone(): boolean;
}

declare class Task {
    units: number;
    title: string;
    done: boolean;
}
