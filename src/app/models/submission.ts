export class Submission {
  constructor(
    public _id: string,
    public username: string,
    public questionname: string,
    public solution: string,
    public solutionBlockly: string,
    public status: string, // initial: not submitted, pass, fail
    public timesubmitted: Date,
    public runtime: number
  ) {}
}
