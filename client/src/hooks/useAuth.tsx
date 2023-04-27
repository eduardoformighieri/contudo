import { atom, useAtom } from 'jotai';

const adminAtom = atom({});

export const useAuth = () => {
  const [admin, setAdmin] = useAtom(adminAtom);

  return {
    admin,
    setAdmin,
  };
};
