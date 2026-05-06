"use client";

import { useState, useEffect } from "react";
import { GenericModal } from "@/components/common/GenericModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Seller, CreateSellerDto } from "@/types/seller.types";
import {
  SELLER_FORM_LABELS,
  SELLER_PLACEHOLDERS,
  SELLER_MODAL,
} from "@/constants/seller.constant";

interface SellerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit" | "view";
  seller?: Seller;
  onSubmit: (data: CreateSellerDto) => Promise<void>;
  loading?: boolean;
}

export function SellerModal({
  open,
  onOpenChange,
  mode,
  seller,
  onSubmit,
  loading = false,
}: SellerModalProps) {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isCreate = mode === "create";

  const [formData, setFormData] = useState<CreateSellerDto>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (seller && (isEdit || isView)) {
      setFormData({
        name: seller.name,
        email: seller.email,
        password: "",
      });
    } else if (isCreate) {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [seller, mode, isEdit, isView, isCreate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (field: keyof CreateSellerDto, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const title = isCreate
    ? SELLER_MODAL.CREATE_TITLE
    : isEdit
      ? SELLER_MODAL.EDIT_TITLE
      : SELLER_MODAL.VIEW_TITLE;

  return (
    <GenericModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      size="md"
      footer={
        !isView && (
          <>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {SELLER_MODAL.CANCEL_BUTTON}
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Guardando..." : SELLER_MODAL.SAVE_BUTTON}
            </Button>
          </>
        )
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{SELLER_FORM_LABELS.NAME}</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={SELLER_PLACEHOLDERS.NAME}
            disabled={isView}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{SELLER_FORM_LABELS.EMAIL}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder={SELLER_PLACEHOLDERS.EMAIL}
            disabled={isView}
            required
          />
        </div>

        {!isView && (
          <div className="space-y-2">
            <Label htmlFor="password">
              {SELLER_FORM_LABELS.PASSWORD}
              {isEdit && (
                <span className="text-neutral-400 text-xs ml-2">
                  (Dejar vacío para mantener)
                </span>
              )}
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder={SELLER_PLACEHOLDERS.PASSWORD}
              required={isCreate}
            />
          </div>
        )}
      </form>
    </GenericModal>
  );
}
