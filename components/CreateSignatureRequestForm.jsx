import { useState } from 'react'

export function CreateSignatureRequestForm() {
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [signers, setSigners] = useState(
        [
            { 
                emailAddress: "", 
                employee_name: "", 
                location: "", 
                start_date: "", 
                salary: "", 
                working_hours:"", 
                working_hour_start: "", 
                working_hour_end:"", 
                work_days: ""
            }
        ]
    );
    const [result, setResult] = useState({});

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = new FormData()
            data.set('title', title)
            data.set('subject', subject)
            data.set('message', message)
            data.set('signers', JSON.stringify(signers))

            const res = await fetch('/api/send', {
                method: 'POST',
                body: data
            })
            // handle the error
            if (!res.ok) throw new Error(await res.text())
            setResult(await res.json())
        } catch (e) {
            // Handle errors here
            console.error(e)
        }
    }

    const handleSignerFieldChange = field => index => e => {
        const newSigners = signers.map((signer, sidx) => {
            if (index !== sidx) return signer
            return { ...signer, [field]: e.target.value }
        })
        setSigners(newSigners)
    }

    const addSigner = () => {
        setSigners([...signers,
            { 
                emailAddress: "", 
                employee_name: "", 
                location: "", 
                start_date: "", 
                salary: "", 
                working_hours:"", 
                working_hour_start: "", 
                working_hour_end:"", 
                work_days: ""
            }])
    }

    const removeSigner = index => () => {
        setSigners(signers.filter((s, sidx) => index !== sidx))
    }

  return (
    <div className="w-full max-w-lg">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
            <div className="mb-4">
                <label className="block uppercase text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                </label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="title"
                    name="title" 
                    type="text" 
                    placeholder="Title"
                    required
                    onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block uppercase text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Subject
                </label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="subject"
                    name="subject" 
                    type="text" 
                    placeholder="Subject"
                    required
                    onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block uppercase text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Message
                </label>
                <textarea 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="message"
                    name="message" 
                    type="text" 
                    placeholder="Message"
                    required
                    onChange={(e) => setMessage(e.target.value)} />
            </div>
            <label className="block text-gray-700 text-sm uppercase font-bold mb-2" htmlFor="signer">
                Employees
            </label>
            {signers.map((signer, index) => (
            <div key={index}>
                <h2 className="text-lg font-bold mb-2">Employee {index + 1}</h2>
                <div className="mb-2">
                    <input 
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="email" 
                        placeholder="Employee Email"
                        required
                        onChange={handleSignerFieldChange("emailAddress")(index)} />
                </div>
                <div className="mb-2">
                    <input 
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Employee Name"
                        required
                        onChange={handleSignerFieldChange("employee_name")(index)} />
                </div>
                <div className="mb-2">
                    <input 
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Office Location"
                        required
                        onChange={handleSignerFieldChange("location")(index)} />
                </div>
                <div className="mb-2">
                    <input 
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Starting from (e. g. 2024-01-01)"
                        required
                        onChange={handleSignerFieldChange("start_date")(index)} />
                </div>
                <div className="mb-2">
                    <input 
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Salary"
                        required
                        onChange={handleSignerFieldChange("salary")(index)} />
                </div>
                <div className="mb-2">
                    <input 
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Work hours e. g. 5 hours per day)"
                        required
                        onChange={handleSignerFieldChange("working_hours")(index)} />
                </div>
                <div className="mb-2">
                    <input 
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Starting time (e. g. 8:00 AM)"
                        required
                        onChange={handleSignerFieldChange("working_hour_start")(index)} />
                </div>
                <div className="mb-2">
                    <input 
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Ending time (e. g. 5:00 PM)"
                        required
                        onChange={handleSignerFieldChange("working_hour_end")(index)} />
                </div>
                <div className="mb-2">
                    <input 
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Work days (e. g. Monday-Friday)"
                        required
                        onChange={handleSignerFieldChange("work_days")(index)} />
                </div>
                { index === 0? null : 
                    <div className='mb-8'>
                         <button 
                            type="button"
                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            onClick={removeSigner(index)}>Remove Employee</button>
                    </div>
               }
               <hr 
                        className='my-4'/>
            </div>
            
            ))}
            <div className='mb-6'>
                <button
                    type="button"
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    onClick={addSigner}>Add Employee</button>
            </div>
            <div className="flex items-center justify-between">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit">
                    Submit
                </button>
                {result.success? <p className="text-green-500 text-xs italic">Success</p> : null}
            </div>
        </form>
    </div>
  )
}
