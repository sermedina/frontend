export interface Route {
    path: string;
    component: React.ComponentType<any>;
    title: string;
    exact?: boolean;
    acl: {
      [key in Role]: {
        type: DecisionType;
        meta?: string;
      };
    };
  }
  
  export enum Role {
    GUEST = 'guest',
    USER = 'user',
    ADMIN = 'admin',
  }
  
  export enum DecisionType {
    ALLOW = 'allow',
    DENY = 'deny',
    REDIRECT = 'redirect',
  }