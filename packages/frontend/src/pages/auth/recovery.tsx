import { useMutation } from '@apollo/client';
import ClayButton from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayLayout from '@clayui/layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { RecoveryMutation } from '../../graphql/schemas';
import Layout from './_layout';

const Recovery = (): React.ReactElement => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [onRecovery, { loading }] = useMutation(RecoveryMutation);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await onRecovery({ variables: { email } });
      toast.info(`A recovery password email was sent to ${email} :)`);
      router.push('/auth/signin');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Layout title="Forgot Password">
      <ClayForm onSubmit={onSubmit} className="mt-5">
        <ClayForm.Group>
          <label htmlFor="email">Email</label>
          <ClayInput
            onChange={({ target: { value } }) => setEmail(value)}
            name="email"
            type="text"
          />
        </ClayForm.Group>
        <ClayLayout.Row>
          <ClayLayout.Col xl={12}>
            <ClayButton
              disabled={!email || loading}
              onClick={onSubmit}
              className="btn-block"
            >
              Send New Password
            </ClayButton>
          </ClayLayout.Col>
        </ClayLayout.Row>
        <ClayLayout.Row className="signin__navigation_buttons">
          <ClayLayout.Col>
            <ClayButton
              onClick={() => router.push('/auth/signin')}
              displayType="unstyled"
              className="btn-link"
            >
              Sign In
            </ClayButton>
          </ClayLayout.Col>
          <ClayLayout.Col style={{ textAlign: 'end' }}>
            <ClayButton
              onClick={() => router.push('/auth/signup')}
              displayType="unstyled"
              className="btn-link"
            >
              Create Account
            </ClayButton>
          </ClayLayout.Col>
        </ClayLayout.Row>
      </ClayForm>
    </Layout>
  );
};

export default Recovery;
