
import { AiOutlineUserDelete } from "react-icons/ai";
import { Control, useFieldArray } from 'react-hook-form';
import { FormValues, IFormUtils } from 'common/interface';
import { useEffect } from "react";
import './CompanyOwnerDetails.scss'

interface ICompanyOwnerDetails extends IFormUtils {
  control: Control<FormValues, any>
}

const CompanyOwnerDetails = ({ control, errors, register }: ICompanyOwnerDetails) => {
  useEffect(() => addOwner(), [])


  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "owners",
  });


  const addOwner = () => {
    prepend({
      firstName: "",
      lastName: "",
    })
  }


  const removeOwner = (index: number) => remove(index)

  return (
    <>
      <h3>Company Owner Details</h3>
      <div className="white-container">
        <table>
          <thead>
            <tr>
              <th>first Name</th>
              <th>last name</th>
            </tr>
          </thead>

          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td>
                  <input style={{ width: '100%' }} autoComplete="new-password" {...register(`owners.${index}.firstName`)} />
                  <p className="error">{errors?.owners && errors?.owners[index]?.firstName?.message}</p>
                </td>
                <td>
                  <input style={{ width: '100%' }} autoComplete="new-password" {...register(`owners.${index}.lastName`)} />
                  <p className="error">{errors?.owners && errors?.owners[index]?.lastName?.message}</p>
                </td>
                <td className="remove-trash"><AiOutlineUserDelete onClick={() => removeOwner(index)} className='remove-trash-icon' /></td>
              </tr>
            ))}
          </tbody>

        </table>
        <button type="button" className="add-item" onClick={() => addOwner()}>add owner</button>
      </div>
    </>
  )
}

export default CompanyOwnerDetails