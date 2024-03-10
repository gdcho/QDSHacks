import 'next-auth';

declare module 'next-auth' {
    interface User {
        id?: string;
        token?: string;
    }

    interface Session {
        user?: User;
    }
}
