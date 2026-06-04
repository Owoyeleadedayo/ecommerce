"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { Button } from "../ui/button";
import { Copy, Check, Landmark, Loader2, Info } from "lucide-react";

interface BankDetails {
  name: string;
  code: string;
  accountNumber: string;
  accountName: string;
  color: string;
}

const BANKS: BankDetails[] = [
  {
    name: "GTBank",
    code: "gtb",
    accountNumber: "0452897143",
    accountName: "CK Cookware Limited",
    color: "bg-[#F37021]", // GTB Orange
  },
  {
    name: "OPay",
    code: "opay",
    accountNumber: "8031234567",
    accountName: "CK Cookware Limited",
    color: "bg-[#00B050]", // OPay Green
  },
  {
    name: "Kuda Bank",
    code: "kuda",
    accountNumber: "2034981156",
    accountName: "CK Cookware Limited",
    color: "bg-[#40196D]", // Kuda Purple
  },
  {
    name: "First Bank",
    code: "first",
    accountNumber: "3019842278",
    accountName: "CK Cookware Limited",
    color: "bg-[#0A2540]", // First Bank Deep Blue/Gold
  },
];

export default function BankTransferForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedBank, setSelectedBank] = useState<BankDetails>(BANKS[0]);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedBank.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      dispatch(clearCart());
      router.push("/checkout/success?payment_method=transfer");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Alert instructions */}
      <div className="bg-accent/30 border border-[#B2A088]/40 rounded-xl p-4 text-sm text-[#E2D2BC] leading-relaxed flex items-start gap-3">
        <Info className="h-5 w-5 text-[#B2A088] flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-1">Bank Transfer Instructions</p>
          Select your preferred commercial bank below, transfer the exact order total to the account displayed, and click the confirmation button when finished.
        </div>
      </div>

      {/* Bank Selection Grid */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50">
          Select Bank
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BANKS.map((bank) => (
            <button
              key={bank.code}
              type="button"
              onClick={() => setSelectedBank(bank)}
              className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${selectedBank.code === bank.code
                  ? "bg-white/10 border-[#B2A088] text-white shadow-lg scale-[1.02]"
                  : "bg-white/5 border-white/5 text-white/70 hover:border-white/15 hover:text-white"
                }`}
            >
              <div
                className={`h-8 w-8 rounded-full ${bank.color} flex items-center justify-center text-white text-xs font-bold font-mono`}
              >
                {bank.name.substring(0, 2)}
              </div>
              <span className="text-sm font-semibold">{bank.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Bank Details Panel */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 space-y-4">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Landmark className="h-5 w-5 text-[#B2A088]" />
          Account Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Account Number */}
          <div className="bg-[#18231E] border border-white/10 rounded-lg p-4 flex items-center justify-between">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">
                Account Number
              </span>
              <span className="text-xl font-bold font-mono tracking-wider text-white">
                {selectedBank.accountNumber}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="p-2 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
              title="Copy Account Number"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-400" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Account Details Text */}
          <div className="bg-[#18231E] border border-white/10 rounded-lg p-4 space-y-2">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-white/50">
                Bank Name
              </span>
              <span className="text-sm font-bold text-white">
                {selectedBank.name}
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-white/50">
                Account Name
              </span>
              <span className="text-sm font-bold text-white">
                {selectedBank.accountName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        disabled={isLoading}
        className="w-full bg-[#B2A088] hover:bg-[#A39178] text-white h-14 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 shadow-lg transition-all hover:scale-[1.01] cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Verifying Transaction...
          </>
        ) : (
          `I've Sent the Money`
        )}
      </Button>
    </form>
  );
}
