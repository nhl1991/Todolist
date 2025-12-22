export interface Todo {
  id: string;
  title: string;
  content: string;
  published?: boolean;
  public: boolean;
  authorId: number;
  createdDt?: Date;
  updatedDt?: Date;
  User: {
    username: string;
  };
}

export interface SignOutResponse {
  code: number;
  message: string;
  success: boolean;
}

export interface SignInResponse {
  code: number;
  message: string;
  success: boolean;
}
