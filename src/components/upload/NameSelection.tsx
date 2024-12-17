import { User } from "@supabase/supabase-js";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useUploadContext } from "@/context/UploadContext";

interface NameSelectionProps {
    user: User;
  }
  
export const NameSelection = ({user}: NameSelectionProps) => {
  const { 
    nameOption,
    customName,
    setNameOption,
    setCustomName
  } = useUploadContext();

    return (
    <div className="space-y-2">
      <Label>Display Name</Label>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="userNameRadio"
            name="nameSelection"
            checked={nameOption === 'user'}
            onChange={() => setNameOption('user')}
            className="h-4 w-4"
          />
          <Label htmlFor="userNameRadio" className="text-sm">
            {user.user_metadata.name || 'User Name Not Available'}
          </Label>
        </div>
  
        {/* <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="customNameRadio"
              name="nameSelection"
              checked={nameOption === 'custom'}
              onChange={() => setNameOption('custom')}
              className="h-4 w-4"
            />
            <Label htmlFor="customNameRadio" className="text-sm">
              Custom Name
            </Label>
          </div>
          {nameOption === 'custom' && (
            <Input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Enter custom name"
              className="ml-6 mt-1 max-w-xs"
              aria-label="Custom name input"
            />
          )}
        </div> */}
  
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="anonymousRadio"
            name="nameSelection"
            checked={nameOption === 'anonymous'}
            onChange={() => setNameOption('anonymous')}
            className="h-4 w-4"
          />
          <Label htmlFor="anonymousRadio" className="text-sm">
            Anonymous
          </Label>
        </div>
      </div>
    </div>
  );
}