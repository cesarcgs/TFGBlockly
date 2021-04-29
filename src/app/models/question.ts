export class Question {
  constructor(
    public _id: string,
    public uniquename: string,
    public sequence: number,
    public title: string,
    public description: string,
    public solution: string,
    public difficulty: number,
    public frequency: number,
    public rating: number,
    public hints: string,
    public parameters: string
  ) {}
}
