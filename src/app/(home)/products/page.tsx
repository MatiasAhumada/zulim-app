"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/common/DataTable";
import { ProductModal } from "@/components/products/ProductModal";
import { ConfirmModal } from "@/components/common/GenericModal";
import { Button } from "@/components/ui/button";
import { Product, CreateProductDto } from "@/types/product.types";
import { productService } from "@/services/product.service";
import {
  PRODUCT_TABLE,
  PRODUCT_MODAL,
  PRODUCT_MESSAGES,
  UNIT_TYPE_LABELS,
} from "@/constants/product.constant";
import {
  clientSuccessHandler,
  clientErrorHandler,
} from "@/utils/handlers/clientError.handler";
import {
  Add01Icon,
  ViewIcon,
  PencilEdit02Icon,
  Delete02Icon,
} from "hugeicons-react";
import { formatCurrency } from "@/utils/currency.util";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create",
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadProducts = async (search?: string) => {
    try {
      setLoading(true);
      const data = await productService.findAll(search);
      setProducts(data);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    loadProducts(value);
  };

  const handleCreate = () => {
    setModalMode("create");
    setSelectedProduct(undefined);
    setModalOpen(true);
  };

  const handleView = (product: Product) => {
    setModalMode("view");
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (data: CreateProductDto) => {
    try {
      setSubmitting(true);

      if (modalMode === "create") {
        await productService.create(data);
        clientSuccessHandler(PRODUCT_MESSAGES.CREATE_SUCCESS);
      } else if (modalMode === "edit" && selectedProduct) {
        await productService.update(selectedProduct.id, data);
        clientSuccessHandler(PRODUCT_MESSAGES.UPDATE_SUCCESS);
      }

      setModalOpen(false);
      loadProducts(searchTerm);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      setSubmitting(true);
      await productService.delete(productToDelete.id);
      clientSuccessHandler(PRODUCT_MESSAGES.DELETE_SUCCESS);
      setDeleteModalOpen(false);
      loadProducts(searchTerm);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: "sku",
      label: "SKU",
      render: (product: Product) => (
        <span className="font-mono text-xs">{product.sku}</span>
      ),
    },
    {
      key: "name",
      label: "Nombre",
      render: (product: Product) => (
        <span className="font-semibold">{product.name}</span>
      ),
    },
    {
      key: "unitType",
      label: "Unidad",
      render: (product: Product) => (
        <span className="text-neutral-400">
          {UNIT_TYPE_LABELS[product.unitType]}
        </span>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      render: (product: Product) => (
        <span
          className={product.stock <= 10 ? "text-red-500 font-semibold" : ""}
        >
          {product.stock}
        </span>
      ),
    },
    {
      key: "salePrice",
      label: "Precio Venta",
      render: (product: Product) => (
        <span className="font-semibold text-green-500">
          {formatCurrency(product.salePrice)}
        </span>
      ),
    },
    {
      key: "actions",
      label: PRODUCT_TABLE.ACTIONS,
      render: (product: Product) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleView(product)}
            className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
          >
            <ViewIcon size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEdit(product)}
            className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
          >
            <PencilEdit02Icon size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDeleteClick(product)}
            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
          >
            <Delete02Icon size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title={PRODUCT_TABLE.TITLE}
        subtitle={PRODUCT_TABLE.SUBTITLE}
        columns={columns}
        data={products}
        keyExtractor={(product) => product.id}
        loading={loading}
        searchPlaceholder={PRODUCT_TABLE.SEARCH_PLACEHOLDER}
        onSearch={handleSearch}
        emptyMessage={PRODUCT_TABLE.EMPTY_MESSAGE}
        actions={
          <Button onClick={handleCreate} className="gap-2">
            <Add01Icon size={18} />
            {PRODUCT_TABLE.NEW_BUTTON}
          </Button>
        }
      />

      <ProductModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        product={selectedProduct}
        onSubmit={handleSubmit}
        loading={submitting}
      />

      <ConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title={PRODUCT_MODAL.DELETE_TITLE}
        description={PRODUCT_MODAL.DELETE_DESCRIPTION}
        onConfirm={handleDelete}
        confirmText={PRODUCT_MODAL.DELETE_CONFIRM}
        cancelText={PRODUCT_MODAL.DELETE_CANCEL}
        variant="destructive"
        loading={submitting}
      />
    </>
  );
}
