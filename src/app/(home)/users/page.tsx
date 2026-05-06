"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/common/DataTable";
import { SellerModal } from "@/components/sellers/SellerModal";
import { ConfirmModal } from "@/components/common/GenericModal";
import { Button } from "@/components/ui/button";
import { Seller, CreateSellerDto } from "@/types/seller.types";
import { sellerService } from "@/services/seller.service";
import { SELLER_TABLE, SELLER_MODAL, SELLER_MESSAGES, ROLE_LABELS } from "@/constants/seller.constant";
import { clientSuccessHandler, clientErrorHandler } from "@/utils/handlers/clientError.handler";
import { Add01Icon, View01Icon, PencilEdit02Icon, Delete02Icon } from "hugeicons-react";

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create");
  const [selectedSeller, setSelectedSeller] = useState<Seller | undefined>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sellerToDelete, setSellerToDelete] = useState<Seller | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadSellers = async (search?: string) => {
    try {
      setLoading(true);
      const data = await sellerService.findAll(search);
      setSellers(data);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSellers();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    loadSellers(value);
  };

  const handleCreate = () => {
    setModalMode("create");
    setSelectedSeller(undefined);
    setModalOpen(true);
  };

  const handleView = (seller: Seller) => {
    setModalMode("view");
    setSelectedSeller(seller);
    setModalOpen(true);
  };

  const handleEdit = (seller: Seller) => {
    setModalMode("edit");
    setSelectedSeller(seller);
    setModalOpen(true);
  };

  const handleDeleteClick = (seller: Seller) => {
    setSellerToDelete(seller);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (data: CreateSellerDto) => {
    try {
      setSubmitting(true);

      if (modalMode === "create") {
        await sellerService.create(data);
        clientSuccessHandler(SELLER_MESSAGES.CREATE_SUCCESS);
      } else if (modalMode === "edit" && selectedSeller) {
        const updateData = data.password ? data : { name: data.name, email: data.email };
        await sellerService.update(selectedSeller.id, updateData);
        clientSuccessHandler(SELLER_MESSAGES.UPDATE_SUCCESS);
      }

      setModalOpen(false);
      loadSellers(searchTerm);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!sellerToDelete) return;

    try {
      setSubmitting(true);
      await sellerService.delete(sellerToDelete.id);
      clientSuccessHandler(SELLER_MESSAGES.DELETE_SUCCESS);
      setDeleteModalOpen(false);
      loadSellers(searchTerm);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Nombre",
      render: (seller: Seller) => (
        <span className="font-semibold">{seller.name}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (seller: Seller) => (
        <span className="text-neutral-400">{seller.email}</span>
      ),
    },
    {
      key: "role",
      label: "Rol",
      render: (seller: Seller) => (
        <span className="px-2 py-1 bg-purple-500/10 text-purple-500 rounded text-xs font-semibold">
          {ROLE_LABELS[seller.role]}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Fecha de Registro",
      render: (seller: Seller) => (
        <span className="text-neutral-400 text-sm">
          {new Date(seller.createdAt).toLocaleDateString("es-AR")}
        </span>
      ),
    },
    {
      key: "actions",
      label: SELLER_TABLE.ACTIONS,
      render: (seller: Seller) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleView(seller)}
            className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
          >
            <View01Icon size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEdit(seller)}
            className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
          >
            <PencilEdit02Icon size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDeleteClick(seller)}
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
        title={SELLER_TABLE.TITLE}
        subtitle={SELLER_TABLE.SUBTITLE}
        columns={columns}
        data={sellers}
        keyExtractor={(seller) => seller.id}
        loading={loading}
        searchPlaceholder={SELLER_TABLE.SEARCH_PLACEHOLDER}
        onSearch={handleSearch}
        emptyMessage={SELLER_TABLE.EMPTY_MESSAGE}
        actions={
          <Button onClick={handleCreate} className="gap-2">
            <Add01Icon size={18} />
            {SELLER_TABLE.NEW_BUTTON}
          </Button>
        }
      />

      <SellerModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        seller={selectedSeller}
        onSubmit={handleSubmit}
        loading={submitting}
      />

      <ConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title={SELLER_MODAL.DELETE_TITLE}
        description={SELLER_MODAL.DELETE_DESCRIPTION}
        onConfirm={handleDelete}
        confirmText={SELLER_MODAL.DELETE_CONFIRM}
        cancelText={SELLER_MODAL.DELETE_CANCEL}
        variant="destructive"
        loading={submitting}
      />
    </>
  );
}
