import React, { useRef } from "react";
import Input from "../../UI/Input";
import classes from "./AmountForm.module.css";

const AmountForm = (props: {
  onAddToCart: (arg0: number) => void;
  id: string;
}) => {
  const amountRef = useRef<any>();
  // const [formIsValid, setformIsValid] = useState(true);    Not needed as we set min-max limitation.
  const submitHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const enteredAmount = +amountRef.current.value;
    if (
      "enteredAmount".trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      // setformIsValid(false);       Not needed as we set min-max limitation.
      return;
    }
    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {/* {!formIsValid && <p>Please enter valid amount !!</p>}     Not needed as we set min-max limitation. */}
    </form>
  );
};

export default AmountForm;
