'use client';

import { AddressSuggestions } from 'react-dadata';
import './dadata.css'
// import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {

  return <AddressSuggestions token="b43af06363c337e6d957e09fe59a60c5ecb9c4ac" onChange={(data) => onChange?.(data?.value)} />;
};
