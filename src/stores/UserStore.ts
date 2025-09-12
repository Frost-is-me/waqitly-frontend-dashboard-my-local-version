import {create} from 'zustand';

interface User {
    id: string;
    username: string;
    name: string;
    email: string;
}

interface AppState {
    user: User;
    setUser:(user:Partial<User>) => void;
}

const UserState = create<AppState>((set)=>({
    user: {
        id: '',
        username: '',
        name: '',
        email: ''
    },
    setUser: (user) => set((state) => ({
        user: { ...state.user, ...user }
    }))
}))

//this is a test store feel free to delete it and change it as I am not using it

export default UserState;