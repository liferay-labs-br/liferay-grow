import { useMutation, useQuery } from '@apollo/client';
import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import ClayLabel from '@clayui/label';
import ClaySticker from '@clayui/sticker';
import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import ImportIllustration from '../assets/import-illustration.svg';
import EmptyState from '../components/EmptyState';
import ManagementToolbar from '../components/ManagementToolbar';
import Modal from '../components/Modal';
import Page from '../components/Page';
import Table from '../components/Table';
import {
  createOrderMutation,
  deleteOrderMutation,
  getAllOrders,
} from '../graphql/schemas';

const StatusTypeDisplay = {
  IN_PROCESSING: 'info',
  NOT_PROCESSED: 'danger',
  PROCESSED: 'success',
};

const columns = [
  {
    key: 'name',
    render: (value, { id }) => (
      <Link href={`/order/${id}`}>
        <span className="ml-2 link">{value}</span>
      </Link>
    ),
    value: 'Name',
  },
  {
    key: 'createdBy',
    render: (value) => (
      <>
        <ClaySticker displayType="light" shape="circle" size="sm">
          <img
            className="sticker-img"
            src="https://avatars2.githubusercontent.com/u/22279592?v=4"
          />
        </ClaySticker>

        <span className="ml-2">{value}</span>
      </>
    ),
    value: 'Created By',
  },
  {
    key: 'createdAt',
    render: (date) => moment(date).fromNow(),
    value: 'Created At',
  },
  {
    key: 'status',
    render: (status) => (
      <ClayLabel displayType={StatusTypeDisplay[status]}>{status}</ClayLabel>
    ),
    value: 'Status',
  },
];

const Order: React.FC = () => {
  const router = useRouter();
  const { data, refetch } = useQuery(getAllOrders, { pollInterval: 25000 });
  const [deleteOrder] = useMutation(deleteOrderMutation);
  const [createOrder] = useMutation(createOrderMutation);
  const [modalVisible, setModalVisible] = useState(false);

  const items = data?.getAllOrder || [];

  const withItems = !!items.length;

  const actions = [
    {
      action({ id }) {
        router.push(`/order/${id}`);
      },
      name: 'Edit',
    },
    {
      action({ id }) {
        deleteOrder({ variables: { id } }).then(refetch);
      },
      name: 'Delete',
    },
  ];

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const AddButton = () => (
    <ClayButton onClick={toggleModal}>
      <span className="inline-item inline-item-before">
        <ClayIcon symbol="import" />
      </span>
      Import
    </ClayButton>
  );

  const onSelectFile = () => {
    createOrder({ variables: { data: { createdBy: 'keven' } } })
      .then(refetch)
      .then(toggleModal);
  };

  return (
    <Page title="Order" addButton={AddButton}>
      <Head>
        <title>Liferay | Order</title>
      </Head>
      <div className="mt-4 p-4" style={{ backgroundColor: 'white' }}>
        <ManagementToolbar orderBy />
        {withItems && (
          <Table borderless actions={actions} columns={columns} items={items} />
        )}

        {!withItems && (
          <EmptyState
            description="Please, import a supported file"
            title="No orders yet"
          >
            {AddButton()}
          </EmptyState>
        )}
      </div>

      <Modal visible={modalVisible} toggle={toggleModal} title="Import File">
        <div className="import-file">
          <div className="mb-4">
            <img src={ImportIllustration}></img>
          </div>
          <div>
            <span>Drag & Drop to Upload or</span>
            <p>Supported file formats are .xls, .xlsx, .xlsm, or .csv</p>
            <ClayButton onClick={onSelectFile} displayType="secondary">
              Select File
            </ClayButton>
          </div>
        </div>
      </Modal>
    </Page>
  );
};

export default Order;
