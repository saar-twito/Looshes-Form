import { useEffect } from 'react'
import { Control, useFieldArray } from 'react-hook-form';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { FormValues } from 'screens/HomePage/interfaces';


interface ICompanyOwnerDetails {
  register: any;
  errors: any
  control: Control<FormValues, any> | undefined
}

const CompanyOwnerDetails = ({ register, errors, control }: ICompanyOwnerDetails) => {

  useEffect(() => addOwner(), [])

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "owners",
  });


  const removeOwnerFromList = (index: number) => remove(index);

  const addOwner = () => {
    prepend({
      firstName: "",
      lastName: "",
    })
  }

  return (
    <div>
      <h3>פרטי בעל\י החברה</h3>
      <div className="white-container">
        <table>
          <thead>
            <tr>
              <th>שם משפחה</th>
              <th>שם פרטי</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr className="owners-table" key={field.id}>
                <td>
                  <label htmlFor={`owners.${index}.firstName`}></label>
                  <input
                    id={`owners.${index}.firstName`}
                    autoComplete="new-password"
                    {...register(`owners.${index}.firstName` as const)} />
                  <p className="error">{errors?.owners && errors?.owners[index]?.firstName?.message}</p>
                </td>
                <td>
                  <label htmlFor={`owners.${index}.lastName`}></label>
                  <input
                    id={`owners.${index}.lastName`}
                    autoComplete="new-password"
                    {...register(`owners.${index}.lastName` as const)} />
                  <p className="error">{errors?.owners && errors?.owners[index]?.lastName?.message}</p>
                </td>
                <td className="remove-trash-td"><AiOutlineUserDelete onClick={() => removeOwnerFromList(index)} className='remove-trash-icon' /></td>
              </tr>
            ))}
          </tbody>

        </table>
        <button type="button" className="add-product" onClick={() => addOwner()}>הוסף בעלים</button>
      </div>
    </div>
  )
}

export default CompanyOwnerDetails