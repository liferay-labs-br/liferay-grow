import { useMutation } from '@apollo/client';
import ClayButton from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayLayout from '@clayui/layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { SignInMutation } from '../../graphql/schemas';
import Layout from './_layout';

const SignIn = (): React.ReactElement => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [signInUser] = useMutation(SignInMutation);
  const router = useRouter();

  const onChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInUser({ variables: form });
      router.push('/');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const onSignInGithub = () => {
    const { NEXT_PUBLIC_GITHUB_CLIENT_ID } = process.env;
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=users`,
      '_self'
    );
  };

  return (
    <Layout title="Sign In">
      <ClayForm onSubmit={onSubmit} className="mt-5">
        <ClayForm.Group>
          <label htmlFor="email">Email</label>
          <ClayInput
            onChange={onChange}
            value={form.email}
            name="email"
            type="text"
          />
        </ClayForm.Group>
        <ClayForm.Group>
          <label htmlFor="password">Password</label>
          <ClayInput
            onChange={onChange}
            value={form.password}
            name="password"
            type="password"
          />
        </ClayForm.Group>
        <ClayLayout.Row>
          <ClayLayout.Col xl={12}>
            <ClayButton
              disabled={!form.email || !form.password}
              onClick={onSubmit}
              className="btn-block"
            >
              Sign In
            </ClayButton>
          </ClayLayout.Col>
        </ClayLayout.Row>
        <ClayLayout.Row className="signin__navigation_buttons">
          <ClayLayout.Col>
            <ClayButton
              onClick={() => router.push('/auth/signup')}
              displayType="unstyled"
              className="btn-link"
            >
              Create Account
            </ClayButton>
          </ClayLayout.Col>
          <ClayLayout.Col style={{ textAlign: 'end' }}>
            <ClayButton
              onClick={onSignInGithub}
              displayType="link"
            >
              Sign in with Github
            </ClayButton>
          </ClayLayout.Col>
        </ClayLayout.Row>
      </ClayForm>
    </Layout>
  );
};

export default SignIn;
