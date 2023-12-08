import {FC, useEffect, useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {create} from '../../core/_requests'
import {Model, Collection} from '../../core/_models'
import {InitialValue} from '../../../../models/roles'
import {useNavigate} from 'react-router'
import {useSnackbar} from 'notistack'
import { useCustomApi } from '../../../privileges/hooks/useCustomApi'
import {SubmitHandler, useForm, SubmitErrorHandler} from 'react-hook-form'
import {DataMappingPrivilege,MappingPrivilege} from '../../../../models/priveleges'

export const CreatePage: FC = () => {
  const [formValues] = useState<Model>(InitialValue)
  const [checklist, setChecklist] = useState<Array<MappingPrivilege>>([]);
  const [privilege, setPrivilege] = useState<Array<DataMappingPrivilege>>([]);
  const [privilegeOptions, setPrivilegeOptions] = useState<Array<any>>([]);
  const { fetchPrivilege } = useCustomApi();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Model>({defaultValues: formValues})
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    async function getFetchPrivilege() {
      const response = await fetchPrivilege();
      console.log(response);
      const {data} = response?.data;
      if (data) {
        setChecklist(data);
        const privilegeOptionsMapping = Object.values(data as object).map((data) => {
          const { name, mapping } = data;
          return {
            name,
            mapping: Object.values(mapping as object).map((entry) => {
              const { action, uri, method } = entry;
              return {
                label: action,
                value: uri.concat("|", method),
              };
            }),
          };
        });

        setPrivilegeOptions(privilegeOptionsMapping)
      }
    }

    getFetchPrivilege();
  }, [])

  const backButton = () => {
    navigate(`/${Collection}`)
  }

  const onError: SubmitErrorHandler<Model> = (errors) => {
    // collection of form error
    // example: console.log('ERROR:', errors.submodule)
  }

  const onSubmit: SubmitHandler<Model> = async (data: Model, e: any) => {
    let {name, privilege} = data;
    
    if(!privilege){
      privilege =[];
    }
    if(!Array.isArray(privilege) && privilege){
        privilege = [privilege];
    }
    
    const privileges = (privilege as string[])?.map((entry) => {
      const splitValue = entry.split("|");
      const [uri, method] = splitValue;
      return {
        uri,
        method
      }
    });

    const result = {
      name,
      privileges
    }
    
    try {
      await create(`${Collection}`, result).then((response) => {
        const {data} = response
        if (data) {
          enqueueSnackbar('Privilege Created', {
            variant: 'success',
          })
        }
        navigate(`/${Collection}`)
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Create</h3>
        </div>
        <div className='card-body'>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className='mb-5'>
              <Form.Label>Role Name</Form.Label>
              <Form.Control type='text' {...register('name', {required: 'This is required'})} />
              <span className='text-danger pt-4'>{errors.name?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Row>
                {privilegeOptions.map((entry, index) => {
                  const {name, mapping} = entry;
                  return (
                    <Col lg={4} className={'mb-5'} key={index}>
                      <Row className={'align-items-start'}>
                        <Col lg={12} className={'font-weight-bold mb-5'}>{name}</Col>
                        <Col lg={12}>
                          {mapping.map((data: any, index: any) => {
                            const {label, value} = data;
                            return (
                              <Form.Check 
                                {...register('privilege')}
                                type={'checkbox'}
                                label={label}
                                value={value}
                                className={'mb-5'}
                                key={index}
                              />
                            )
                          })}
                        </Col>
                      </Row>
                    </Col>
                  )
                })}
              </Row>
            </Form.Group>
            <Form.Group className='mb-4 d-flex justify-content-end'>
              <Button variant='secondary' onClick={backButton}>
                Back
              </Button>
              <Button variant='primary' className='ms-4' type='submit'>
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}
