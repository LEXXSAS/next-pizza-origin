'use client';

import { Controller, useFormContext } from "react-hook-form";
import { Input, Textarea } from "../../ui";
import { AdressInput } from "../address-input";
import { FormTextarea } from "../form-components";
import { WhiteBlock } from "../white-block";
import { ErrorText } from "../error-text";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({className}) => {
  const {control} = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
    <div className="flex flex-col gap-5">
      <Controller
      control={control}
      name="address"
      render={({field, fieldState}) => <>
      <AdressInput onChange={field.onChange}/>
      {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
      </>}
      />

      <FormTextarea name="comment" className="text-base" placeholder="Комментарий к заказу" rows={5}/>
    </div>
    </WhiteBlock>
  )
}
