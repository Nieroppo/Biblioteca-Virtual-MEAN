export class Book{
    constructor(
        public _id: string,
        public title: string,
        public author: string,
        public publisher: string,
        public category: string,
        public isbn: string,
        public cover: string,
        public borrowed: boolean,
        public borrowedTo : string
    ){}
}