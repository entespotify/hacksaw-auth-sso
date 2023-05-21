import { type } from "os";
import { FC, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Transaction } from "../../types/transaction";
import useAddEditTransactionForm from "./hooks/useAddEditTransactionForm";

type AddEditTransactionFormProps = {
  isEdit: boolean;
  transactions?: Transaction;
}

const AddEditTransactionForm:FC<AddEditTransactionFormProps> = (props) => {
  const {isEdit, transactions} = props;
  const { methods, FormProvider, onSubmit } = useAddEditTransactionForm();
  const { control, handleSubmit } = methods;

  useEffect(()=>{
    methods.reset({
      title: transactions?.title,
      description: transactions?.description,
      amount: transactions?.amount
    })
  },[isEdit, methods, transactions])

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <div>
                <label>Enter Title</label>
                <input
                  type={"text"}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div>
                <label>Enter Desctiption</label>
                <input
                  type={"text"}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <div>
                <label>Enter Amount</label>
                <input
                  type={"text"}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
          <input type="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default AddEditTransactionForm;
