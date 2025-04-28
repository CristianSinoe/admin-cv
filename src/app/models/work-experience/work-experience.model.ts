export class WorkExperience {
  constructor(
    public id?: string,         
    public startDate: string = '', 
    public endDate: string = '',   
    public location: string = '',  
    public position: string = '',  
    public company: string = '', 
    public accomplishments: string = ''
  ) {}
}
