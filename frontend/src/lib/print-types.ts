export type PrintStatus = "pending" | "printed";

export type Printer = {
  id: number;
  name: string;
  isAvailable: boolean;
};

export type PrintRequest = {
  id: number;
  title: string;
  pages: number;
  status: PrintStatus;
  printer: Printer;
};
