declare module "@cashfreepayments/cashfree-js" {
  interface CashfreeInstance {
    checkout(options: {
      paymentSessionId: string;
      redirectTarget?: "_self" | "_blank" | "_top" | "_modal" | HTMLElement;
    }): Promise<any>;
  }

  export function load(config: {
    mode: "sandbox" | "production";
  }): Promise<CashfreeInstance>;
}
