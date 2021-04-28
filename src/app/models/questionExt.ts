export class QuestionExt {
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
    public parameters: string,
    // ids for submissions
    public id1: string,
    public id2: string,
    public id3: string
  ) {}
}
