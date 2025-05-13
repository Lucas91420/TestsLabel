export interface User {
    id: number;
    name: string;
  }
  
  let users: User[] = [];
  let nextId = 1;
  
  export function getUsers(): User[] {
    return users;
  }
  
  export function createUser(name: string): User {
    const user = { id: nextId++, name };
    users.push(user);
    return user;
  }
  
  export function resetStore(): void {
    users = [];
    nextId = 1;
  }
  
  export function getUserById(id: number): User | undefined {
    return users.find(user => user.id === id);
  }
  
  export function updateUserName(id: number, name: string): User | undefined {
    const user = users.find(user => user.id === id);
    if (user) {
      user.name = name;
      return user;
    }
    return undefined;
  }
  export function setUsers(initial: User[]): void {
    users = [...initial];
    nextId = users.length + 1;
  }
    
  