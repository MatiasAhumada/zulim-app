"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/common/DataTable";
import { ClientModal } from "@/components/clients/ClientModal";
import { ConfirmModal } from "@/components/common/GenericModal";
import { Button } from "@/components/ui/button";
import { Client, CreateClientDto } from "@/types/client.types";
import { clientService } from "@/services/client.service";
import {
  CLIENT_TABLE,
  CLIENT_MODAL,
  CLIENT_MESSAGES,
  TAX_CONDITION_OPTIONS,
} from "@/constants/client.constant";
import {
  clientSuccessHandler,
  clientErrorHandler,
} from "@/utils/handlers/clientError.handler";
import {
  Add01Icon,
  View01Icon,
  PencilEdit02Icon,
  Delete02Icon,
} from "hugeicons-react";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create",
  );
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadClients = async (search?: string) => {
    try {
      setLoading(true);
      const data = await clientService.findAll(search);
      setClients(data);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    loadClients(value);
  };

  const handleCreate = () => {
    setModalMode("create");
    setSelectedClient(undefined);
    setModalOpen(true);
  };

  const handleView = (client: Client) => {
    setModalMode("view");
    setSelectedClient(client);
    setModalOpen(true);
  };

  const handleEdit = (client: Client) => {
    setModalMode("edit");
    setSelectedClient(client);
    setModalOpen(true);
  };

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (data: CreateClientDto) => {
    try {
      setSubmitting(true);

      if (modalMode === "create") {
        await clientService.create(data);
        clientSuccessHandler(CLIENT_MESSAGES.CREATE_SUCCESS);
      } else if (modalMode === "edit" && selectedClient) {
        await clientService.update(selectedClient.id, data);
        clientSuccessHandler(CLIENT_MESSAGES.UPDATE_SUCCESS);
      }

      setModalOpen(false);
      loadClients(searchTerm);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!clientToDelete) return;

    try {
      setSubmitting(true);
      await clientService.delete(clientToDelete.id);
      clientSuccessHandler(CLIENT_MESSAGES.DELETE_SUCCESS);
      setDeleteModalOpen(false);
      loadClients(searchTerm);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setSubmitting(false);
    }
  };

  const getTaxConditionLabel = (value: string) => {
    const option = TAX_CONDITION_OPTIONS.find((opt) => opt.value === value);
    return option?.label ?? value;
  };

  const columns = [
    {
      key: "name",
      label: "Nombre",
      render: (client: Client) => (
        <span className="font-semibold">{client.name}</span>
      ),
    },
    {
      key: "taxId",
      label: "CUIT/CUIL/DNI",
      render: (client: Client) => (
        <span className="font-mono text-xs">{client.taxId}</span>
      ),
    },
    {
      key: "taxCondition",
      label: "Condición Fiscal",
      render: (client: Client) => (
        <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-xs font-semibold">
          {getTaxConditionLabel(client.taxCondition)}
        </span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (client: Client) => (
        <span className="text-neutral-400 text-sm">{client.email ?? "-"}</span>
      ),
    },
    {
      key: "phone",
      label: "Teléfono",
      render: (client: Client) => (
        <span className="text-neutral-400 text-sm">{client.phone ?? "-"}</span>
      ),
    },
    {
      key: "actions",
      label: CLIENT_TABLE.ACTIONS,
      render: (client: Client) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleView(client)}
            className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
          >
            <View01Icon size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEdit(client)}
            className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
          >
            <PencilEdit02Icon size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDeleteClick(client)}
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
        title={CLIENT_TABLE.TITLE}
        subtitle={CLIENT_TABLE.SUBTITLE}
        columns={columns}
        data={clients}
        keyExtractor={(client) => client.id}
        loading={loading}
        searchPlaceholder={CLIENT_TABLE.SEARCH_PLACEHOLDER}
        onSearch={handleSearch}
        emptyMessage={CLIENT_TABLE.EMPTY_MESSAGE}
        actions={
          <Button onClick={handleCreate} className="gap-2">
            <Add01Icon size={18} />
            {CLIENT_TABLE.NEW_BUTTON}
          </Button>
        }
      />

      <ClientModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        client={selectedClient}
        onSubmit={handleSubmit}
        loading={submitting}
      />

      <ConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title={CLIENT_MODAL.DELETE_TITLE}
        description={CLIENT_MODAL.DELETE_DESCRIPTION}
        onConfirm={handleDelete}
        confirmText={CLIENT_MODAL.DELETE_CONFIRM}
        cancelText={CLIENT_MODAL.DELETE_CANCEL}
        variant="destructive"
        loading={submitting}
      />
    </>
  );
}
