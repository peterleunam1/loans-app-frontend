import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert, Typography } from "@mui/material";
import { PaymentsLayout } from "components/templates";
import { type LoansModel, type AppStore, type UserCompleteModel } from "models";
import { localStorageTypes, publicRoutes } from "constant";
import { updateUser } from "../../../../redux/states/users";
import { getFeeAmount, getLocalStorage } from "utils";
import { useNavigation } from "hooks";
import { addAbonoLoan } from "../../../../redux/states/user";
import { PayCard } from "components/molecules";
import { useState } from "react";

export default function PaysThree() {
  const [message, setMessage] = useState<string | null>(null);
  const id: string = useParams<{ id: string }>().id ?? "";
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const currentClientDocument = useSelector(
    (store: AppStore) => store.owner.document
  );
  const globalUsers = useSelector((store: AppStore) => store.users);
  const user = globalUsers.find(
    (user) => user.document === currentClientDocument
  ) as UserCompleteModel;
  const loan = user.loans.find((loan) => loan.id === Number(id)) as LoansModel;
  const feeAmount = getFeeAmount({
    initialAmount: loan.initialAmount,
    interest: loan.interest,
    nFees: loan.n_fees,
  });
  const handlePay = () => {
    const newLoansToUpdateListUsers = user.loans.map((loan) => {
      if (loan.id === Number(id)) {
        return {
          ...loan,
          paid_fees: loan.paid_fees + 1,
          abonos: loan.abonos + feeAmount,
        };
      }
      return loan;
    });

    dispatch(
      updateUser({
        ...user,
        loans: newLoansToUpdateListUsers,
      })
    );

    getLocalStorage(localStorageTypes.USER) !== undefined &&
      dispatch(
        addAbonoLoan({
          ...loan,
          paid_fees: loan.paid_fees + 1,
          abonos: loan.abonos + feeAmount,
        })
      );
    setMessage("Pago realizado con éxito");

    setTimeout(() => {
      goTo(`/${publicRoutes.PAY_ONE}`);
    }, 2000);
  };
  return (
    <PaymentsLayout activeStep={2}>
      {message && (
        <Alert severity="success">El pago ha sido realizado con éxito</Alert>
      )}
      <PayCard handlePay={handlePay} onChange={() => {}} />
      <Typography
        onClick={() => {
          goTo(`/${publicRoutes.PAY_TWO}`);
        }}
      >
        Regresar
      </Typography>
    </PaymentsLayout>
  );
}
