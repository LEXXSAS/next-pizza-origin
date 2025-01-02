import { Button } from "@/shared/components/ui";
import { DialogContent, Dialog } from "@/shared/components/ui/dialog";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginForm } from "./forms/login-form";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({onClose, open}) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  }

  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog aria-describedby={undefined}  open={open} onOpenChange={handleClose}>
       <DialogContent id="auth-modal" aria-describedby={undefined} className="w-[450px] bg-white p-10">
        
        {
          type === 'login' ? (
            <LoginForm onClose={handleClose} />
          ) : <h1>REGISTER</h1>
        }

        <hr></hr>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" />
            <DialogTitle>
            GitHub
            </DialogTitle>
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            <DialogTitle>Google</DialogTitle>
          </Button>
        </div>

        <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
       </DialogContent>
    </Dialog>
  )
}
