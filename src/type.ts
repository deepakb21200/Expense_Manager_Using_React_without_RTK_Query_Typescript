export interface Expense{
    id: number;
    expense_type: string;
    expense_date: string;
    expense_amount: number;
    description: string;
}


export interface UserProfile{
    firstName:string
    lastName:string
    email:string
}