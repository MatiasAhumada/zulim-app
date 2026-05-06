"use client";

import { useState, useEffect } from "react";
import { GenericModal } from "@/components/common/GenericModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Client, CreateClientDto } from "@/types/client.types";
import {
  CLIENT_FORM_LABELS,
  CLIENT_PLACEHOLDERS,
  CLIENT_MODAL,
  TAX_CONDITION_OPTIONS,
} from "@/constants/client.constant";

interface ClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit" | "view";
  client?: Client;
  onSubmit: (data: CreateClientDto) => Promise<void>;
  loading?: boolean;
}

export function ClientModal({
  open,
  onOpenChange,
  mode,
  client,
  onSubmit,
  loading = false,
}: ClientModalProps) {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isCreate = mode === "create";

  const [formData, setFormData] = useState<CreateClientDto>({
    name: "",
    taxId: "",
    taxCondition: "CONSUMIDOR_FINAL",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (client && (isEdit || isView)) {
      setFormData({
        name: client.name,
        taxId: client.taxId,
        taxCondition: client.taxCondition,
        email: client.email ?? "",
        phone: client.phone ?? "",
        address: client.address ?? "",
      });
    } else if (isCreate) {
      setFormData({
        name: "",
        taxId: "",
        taxCondition: "CONSUMIDOR_FINAL",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, [client, mode, isEdit, isView, isCreate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (field: keyof CreateClientDto, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const title = isCreate
    ? CLIENT_MODAL.CREATE_TITLE
    : isEdit
      ? CLIENT_MODAL.EDIT_TITLE
      : CLIENT_MODAL.VIEW_TITLE;

  return (
    <GenericModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      size="lg"
      footer={
        !isView && (
          <>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {CLIENT_MODAL.CANCEL_BUTTON}
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Guardando..." : CLIENT_MODAL.SAVE_BUTTON}
            </Button>
          </>
        )
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">{CLIENT_FORM_LABELS.NAME}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder={CLIENT_PLACEHOLDERS.NAME}
              disabled={isView}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxId">{CLIENT_FORM_LABELS.TAX_ID}</Label>
            <Input
              id="taxId"
              value={formData.taxId}
              onChange={(e) => handleChange("taxId", e.target.value)}
              placeholder={CLIENT_PLACEHOLDERS.TAX_ID}
              disabled={isView}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="taxCondition">
            {CLIENT_FORM_LABELS.TAX_CONDITION}
          </Label>
          <Select
            value={formData.taxCondition}
            onValueChange={(value) => handleChange("taxCondition", value)}
            disabled={isView}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TAX_CONDITION_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">{CLIENT_FORM_LABELS.EMAIL}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder={CLIENT_PLACEHOLDERS.EMAIL}
              disabled={isView}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{CLIENT_FORM_LABELS.PHONE}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder={CLIENT_PLACEHOLDERS.PHONE}
              disabled={isView}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">{CLIENT_FORM_LABELS.ADDRESS}</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder={CLIENT_PLACEHOLDERS.ADDRESS}
            disabled={isView}
          />
        </div>
      </form>
    </GenericModal>
  );
}
