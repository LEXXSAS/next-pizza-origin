import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Title } from './title';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

interface Props {
  title: string;
  text: string;
  className?: string;
  imageUrl?: string;
}

export const InfoBlock: React.FC<Props> = ({ className, title, text, imageUrl }) => {
  return (
    <div id='info-block' className={cn(className, 'flex items-center container-fluid justify-between gap-12')}>
      <div className="flex flex-col">
        <div id='info-block-title'>
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-gray-400 text-lg">{text}</p>
        </div>

        <div className="flex gap-5 mt-11 flex-wrap">
          <div>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft />
              На главную
            </Button>
          </Link>
          </div>
          <div>
          <a href="">
            <Button variant="outline" className="text-gray-500 border-gray-400 hover:bg-gray-50">
              Обновить
            </Button>
          </a>
          </div>
        </div>
      </div>

      {/* <img src={imageUrl} alt={title} width={300} /> */}
    </div>
  );
};
