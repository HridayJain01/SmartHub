declare module '../data/dummyUsers.json' {
  export interface DummyUser {
    id: string;
    email: string;
    password: string;
    role: string;
    isComplete: boolean;
  }

  const value: { users: DummyUser[] };
  export default value;
}