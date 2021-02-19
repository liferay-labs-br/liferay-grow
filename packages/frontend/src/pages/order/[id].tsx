import { useQuery } from '@apollo/client';
import ClayBadge from '@clayui/badge';
import ClayLabel from '@clayui/label';
import ClayLayout from '@clayui/layout';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Page from '../../components/Page';
import { getOrderQuery } from '../../graphql/schemas';

const statuses = {
  COMPLETE: 'success',
  CREATED: 'primary',
  DISCARDED: 'danger',
  IN_EXECUTION: 'warning',
  WAITING_WINDOW: 'secondary'
};

const getLabelColor = (label) => {
  return statuses[label];
};

interface IOrder {
  id: string;
}

interface Service {
  name?: string;
  orderId?: string;
  assinedTo?: string;
  createdAt?: string;
  statusMessage?: string;
  type?: string;
  description?: string;
  status?: string;
}

const Order = ({ id }: IOrder): React.ReactElement => {
  const router = useRouter();
  const { loading, data = {} } = useQuery(getOrderQuery, {
    pollInterval: 15000,
    variables: { id }
  });

  const { getOrder = { services: [] } } = data;
  const { createdAt, name, services } = getOrder;

  const [service, setService] = useState<Service>({});

  useEffect(() => {
    if (services.length) {
      setService(services[0]);
    }
  }, [loading]);

  return (
    <Page onClickBack={() => router.push('/')} title={name}>
      <Head>
        <title>Liferay | {name}</title>
      </Head>
      <ClayLayout.ContainerFluid>
        <ClayLayout.Row>
          <ClayLayout.Col xl={4} className="order-list">
            <div className="p-3">
              <div className="mt-2 mb-4">
                <h1 className="d-flex">
                  Services
                  <div style={{ marginLeft: 10, marginTop: -3 }}>
                    <ClayBadge displayType="info" label={services.length} />
                  </div>
                </h1>
              </div>
              {services.map((service) => (
                <div
                  key={service.id}
                  className="service-list order-card mb-4"
                  onClick={() => setService(service)}
                >
                  <p>
                    {service.name}
                    <ClayLabel
                      displayType={getLabelColor(service.status)}
                      className="ml-2"
                    >
                      {service.status}
                    </ClayLabel>
                  </p>
                  <span>{moment(createdAt).fromNow()}</span>
                </div>
              ))}
            </div>
          </ClayLayout.Col>
          <ClayLayout.Col className="order-details">
            <div className="p-3">
              <div className="mt-2 mb-4">
                <h1>{service.name}</h1>
              </div>
              <div className="order-card">
                <ClayLayout.Row className="order-info">
                  <ClayLayout.Col>
                    <p>Created Data</p>
                    <span>{moment(service.createdAt).fromNow()}</span>
                  </ClayLayout.Col>
                  <ClayLayout.Col>
                    <p>Service Type</p>
                    <span>{service.type}</span>
                  </ClayLayout.Col>
                </ClayLayout.Row>

                <ClayLayout.Row className="order-info">
                  <ClayLayout.Col>
                    <p>Assigned</p>
                    <span>{service.assinedTo}</span>
                  </ClayLayout.Col>
                  <ClayLayout.Col>
                    <p>Status</p>
                    <ClayLabel displayType={getLabelColor(service.status)}>
                      {service.status}
                    </ClayLabel>
                  </ClayLayout.Col>
                </ClayLayout.Row>

                {service.statusMessage && (
                  <ClayLayout.Row className="order-info">
                    <ClayLayout.Col>
                      <p>Status Message</p>
                      <span>{service.statusMessage}</span>
                    </ClayLayout.Col>
                  </ClayLayout.Row>
                )}

                <ClayLayout.Row className="order-info">
                  <ClayLayout.Col>
                    <p>Description</p>
                    <span>{service.description}</span>
                  </ClayLayout.Col>
                </ClayLayout.Row>
              </div>
            </div>
          </ClayLayout.Col>
        </ClayLayout.Row>
      </ClayLayout.ContainerFluid>
    </Page>
  );
};

Order.getInitialProps = async ({ query: { id } }) => {
  return { id };
};

export default Order;
