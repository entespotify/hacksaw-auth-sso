import { FormProvider, useForm } from "react-hook-form";

import { useAddNewTransactionMutation } from "../../../services/apis";

const useAddEditTransactionForm = () => {
  const methods = useForm();

  const [addNewTransaction, { data: newTransaction }] =
    useAddNewTransactionMutation();

  const onSubmit = (newTransaction: any) => {
    addNewTransaction({
      ...newTransaction,
      amount: Number(newTransaction.amount),
    });
    methods.reset({});
  };
  return {
    methods,
    FormProvider,
    onSubmit,
  };
};
export default useAddEditTransactionForm;
