type ConditionalProps = {
  when: boolean;
  children: React.ReactNode;
};

export const Conditional = ({ when, children }: ConditionalProps) => {
  return when ? children : null;
};
