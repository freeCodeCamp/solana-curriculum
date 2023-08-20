import { Wallet } from '@coral-xyz/anchor';
import { useEffect, useRef } from 'react';

export type Task = {
  id: number;
  name: string;
  completed: boolean;
};

export type TodoT = {
  name: string;
  id: number;
  completed: boolean;
  toggleTaskCompleted: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, newName: string) => void;
};

export type FormT = {
  addTask: (name: string) => void;
};

export type FilterButtonT = {
  name: Filters;
  isPressed: boolean;
  setFilter: (name: Filters) => void;
};

export type Filters = keyof typeof FILTER_MAP;

export const FILTER_MAP = {
  All: () => true,
  Active: (task: Task) => !task.completed,
  Completed: (task: Task) => task.completed
} as const;

export const FILTER_NAMES = Object.keys(FILTER_MAP) as Array<
  keyof typeof FILTER_MAP
>;

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function isWalletConnected(wallet: any): wallet is Wallet {
  return wallet.publicKey !== null;
}
