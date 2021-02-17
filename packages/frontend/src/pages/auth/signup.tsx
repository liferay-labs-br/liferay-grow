import { useMutation } from '@apollo/client';
import ClayButton from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayLayout from '@clayui/layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { SignUpMutation } from '../../graphql/schemas';
import Layout from './_layout';

const SignUp = (): React.ReactElement => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
    screen_name: '',
  });
  const [signUpUser, { loading }] = useMutation(SignUpMutation);

  const onChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, screen_name } = form;
      const [firstName, ...lastName] = screen_name.split(' ');
      await signUpUser({
        variables: {
          data: {
            email,
            firstName,
            lastName: lastName.join(' '),
            password,
          },
        },
      });
      toast.info('Account created with success');
      router.push('/auth/signin');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Layout title="Create an Account">
      <ClayForm onSubmit={onSubmit} className="mt-5">
        <ClayForm.Group>
          <label htmlFor="email">Screen Name</label>
          <ClayInput onChange={onChange} name="screen_name" type="text" />
        </ClayForm.Group>
        <ClayForm.Group>
          <label htmlFor="email">Email</label>
          <ClayInput onChange={onChange} name="email" type="text" />
        </ClayForm.Group>
        <ClayForm.Group>
          <label htmlFor="password">Password</label>
          <ClayInput onChange={onChange} name="password" type="password" />
        </ClayForm.Group>
        <ClayLayout.Row>
          <ClayLayout.Col xl={5}>
            <ClayButton className="btn-block">Cancel</ClayButton>
          </ClayLayout.Col>
          <ClayLayout.Col xl={7}>
            <ClayButton
              disabled={
                !form.email || !form.password || !form.screen_name || loading
              }
              onClick={onSubmit}
              className="btn-block"
            >
              Create
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
              onClick={() => router.push('/auth/recovery')}
              displayType="unstyled"
              className="btn-link"
            >
              Forgot Password
            </ClayButton>
          </ClayLayout.Col>
        </ClayLayout.Row>
      </ClayForm>
    </Layout>
  );
};

export default SignUp;
