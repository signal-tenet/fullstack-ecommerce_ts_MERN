import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import {
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js/types/components/buttons';

interface PayPalButtonProps {
  total: () => string;
  onPaymentSuccess: (data: OnApproveData, actions: OnApproveActions) => void;
  onPaymentError: () => void;
  disabled?: boolean;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  total,
  onPaymentSuccess,
  onPaymentError,
  disabled,
}) => {
  return (
    <PayPalScriptProvider options={{ 'client-id': 'test' }}>
      <PayPalButtons
        disabled={disabled}
        style={{
          layout: 'vertical',
          shape: 'pill',
          color: 'gold',
          label: 'paypal',
        }}
        createOrder={(_data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total(),
                },
              },
            ],
          });
        }}
        onApprove={(_data: OnApproveData, actions: OnApproveActions) => {
          if (actions.order) {
            return actions.order.capture().then((details) => {
              onPaymentSuccess(_data, actions);
            });
          }
          return Promise.resolve();
        }}
        onError={(err) => {
          onPaymentError();
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
