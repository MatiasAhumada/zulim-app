"use client";

import { useState, useEffect } from "react";
import { GenericModal } from "@/components/common/GenericModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product, CreateProductDto, UnitType } from "@/types/product.types";
import { PRODUCT_FORM_LABELS, PRODUCT_PLACEHOLDERS, PRODUCT_MODAL, UNIT_TYPE_LABELS } from "@/constants/product.constant";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit" | "view";
  product?: Product;
  onSubmit: (data: CreateProductDto) => Promise<void>;
  loading?: boolean;
}

export function ProductModal({
  open,
  onOpenChange,
  mode,
  product,
  onSubmit,
  loading = false,
}: ProductModalProps) {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isCreate = mode === "create";

  const [formData, setFormData] = useState<CreateProductDto>({
    name: "",
    sku: "",
    description: "",
    unitType: "UNIT",
    minSaleQuantity: 1,
    maxSaleQuantity: undefined,
    purchasePrice: 0,
    profitMargin: 0,
    retailPrice: 0,
    wholesalePrice: 0,
    stock: 0,
  });

  useEffect(() => {
    if (product && (isEdit || isView)) {
      setFormData({
        name: product.name,
        sku: product.sku,
        description: product.description ?? "",
        unitType: product.unitType,
        minSaleQuantity: product.minSaleQuantity,
        maxSaleQuantity: product.maxSaleQuantity ?? undefined,
        purchasePrice: product.purchasePrice,
        profitMargin: product.profitMargin,
        retailPrice: product.retailPrice,
        wholesalePrice: product.wholesalePrice,
        stock: product.stock,
      });
    } else if (isCreate) {
      setFormData({
        name: "",
        sku: "",
        description: "",
        unitType: "UNIT",
        minSaleQuantity: 1,
        maxSaleQuantity: undefined,
        purchasePrice: 0,
        profitMargin: 0,
        retailPrice: 0,
        wholesalePrice: 0,
        stock: 0,
      });
    }
  }, [product, mode, isEdit, isView, isCreate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (field: keyof CreateProductDto, value: string | number | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const title = isCreate ? PRODUCT_MODAL.CREATE_TITLE : isEdit ? PRODUCT_MODAL.EDIT_TITLE : PRODUCT_MODAL.VIEW_TITLE;

  return (
    <GenericModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      size="2xl"
      footer={
        !isView && (
          <>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              {PRODUCT_MODAL.CANCEL_BUTTON}
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Guardando..." : PRODUCT_MODAL.SAVE_BUTTON}
            </Button>
          </>
        )
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">{PRODUCT_FORM_LABELS.NAME}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder={PRODUCT_PLACEHOLDERS.NAME}
              disabled={isView}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">{PRODUCT_FORM_LABELS.SKU}</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => handleChange("sku", e.target.value)}
              placeholder={PRODUCT_PLACEHOLDERS.SKU}
              disabled={isView}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">{PRODUCT_FORM_LABELS.DESCRIPTION}</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder={PRODUCT_PLACEHOLDERS.DESCRIPTION}
            disabled={isView}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="unitType">{PRODUCT_FORM_LABELS.UNIT_TYPE}</Label>
            <Select
              value={formData.unitType}
              onValueChange={(value) => handleChange("unitType", value as UnitType)}
              disabled={isView}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UNIT">{UNIT_TYPE_LABELS.UNIT}</SelectItem>
                <SelectItem value="KG">{UNIT_TYPE_LABELS.KG}</SelectItem>
                <SelectItem value="METERS">{UNIT_TYPE_LABELS.METERS}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minSaleQuantity">{PRODUCT_FORM_LABELS.MIN_SALE_QUANTITY}</Label>
            <Input
              id="minSaleQuantity"
              type="number"
              step="0.01"
              value={formData.minSaleQuantity}
              onChange={(e) => handleChange("minSaleQuantity", parseFloat(e.target.value))}
              placeholder={PRODUCT_PLACEHOLDERS.MIN_SALE_QUANTITY}
              disabled={isView}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxSaleQuantity">{PRODUCT_FORM_LABELS.MAX_SALE_QUANTITY}</Label>
            <Input
              id="maxSaleQuantity"
              type="number"
              step="0.01"
              value={formData.maxSaleQuantity ?? ""}
              onChange={(e) => handleChange("maxSaleQuantity", e.target.value ? parseFloat(e.target.value) : undefined)}
              placeholder={PRODUCT_PLACEHOLDERS.MAX_SALE_QUANTITY}
              disabled={isView}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="purchasePrice">{PRODUCT_FORM_LABELS.PURCHASE_PRICE}</Label>
            <Input
              id="purchasePrice"
              type="number"
              step="0.01"
              value={formData.purchasePrice}
              onChange={(e) => handleChange("purchasePrice", parseFloat(e.target.value))}
              placeholder={PRODUCT_PLACEHOLDERS.PURCHASE_PRICE}
              disabled={isView}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profitMargin">{PRODUCT_FORM_LABELS.PROFIT_MARGIN}</Label>
            <Input
              id="profitMargin"
              type="number"
              step="0.01"
              value={formData.profitMargin}
              onChange={(e) => handleChange("profitMargin", parseFloat(e.target.value))}
              placeholder={PRODUCT_PLACEHOLDERS.PROFIT_MARGIN}
              disabled={isView}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="retailPrice">{PRODUCT_FORM_LABELS.RETAIL_PRICE}</Label>
            <Input
              id="retailPrice"
              type="number"
              step="0.01"
              value={formData.retailPrice}
              onChange={(e) => handleChange("retailPrice", parseFloat(e.target.value))}
              placeholder={PRODUCT_PLACEHOLDERS.RETAIL_PRICE}
              disabled={isView}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wholesalePrice">{PRODUCT_FORM_LABELS.WHOLESALE_PRICE}</Label>
            <Input
              id="wholesalePrice"
              type="number"
              step="0.01"
              value={formData.wholesalePrice}
              onChange={(e) => handleChange("wholesalePrice", parseFloat(e.target.value))}
              placeholder={PRODUCT_PLACEHOLDERS.WHOLESALE_PRICE}
              disabled={isView}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">{PRODUCT_FORM_LABELS.STOCK}</Label>
          <Input
            id="stock"
            type="number"
            step="0.01"
            value={formData.stock}
            onChange={(e) => handleChange("stock", parseFloat(e.target.value))}
            placeholder={PRODUCT_PLACEHOLDERS.STOCK}
            disabled={isView}
            required
          />
        </div>
      </form>
    </GenericModal>
  );
}
