import { create } from 'zustand'

interface IProps {
    key: string
    setKey: (key: string) => void
}

export const useTableKeyStore = create<IProps>((set) => ({
    key: "",
    setKey: (key) => set(() => ({ key }))
}))