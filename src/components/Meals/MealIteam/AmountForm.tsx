import React from "react";
import Input from "../../UI/Input";
import classes from "./AmountForm.module.css";

const AmountForm = (props: { id: string }) => {
  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default AmountForm;
