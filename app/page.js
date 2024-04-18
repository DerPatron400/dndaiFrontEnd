import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Card from "@/components/campaigns/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/context-menu";
import SaveProgress from "@/components/messages/saveProgress";
import CustomInput from "@/components/ui/custom-input";
import SearchInput from "@/components/ui/search-input";
import CustomTab from "@/components/ui/custom-tab";
import { MessageCircle, ArrowUp, Undo2, ShieldX } from "lucide-react";
import CustomInputIcon from "@/components/ui/custom-input-icon";
import CommentBox from "@/components/ui/comment-box";
import ToastWithAction from "@/components/ui/custom-toast";
export default function Home() {
  return (
    <div
      className='w-screen h-screen pt-40 flex gap-x-3 flex-wrap justify-center items-center'
      style={{
        backgroundImage: "url(/images/Header.png)",
        backgroundSize: "cover",
      }}
    >
      <SearchInput />

      <CustomInputIcon
        placeholder='What Would You Do?'
        icon={<ArrowUp size={16} />}
      />
      <CustomTab
        icon={<MessageCircle size={16} />}
        text={"comments"}
        number={258}
      />

      <CustomInput placeholder='Input Control' />

      <Switch />
      <RadioGroup defaultValue='option-one'>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='option-one' id='option-one' />
          <Label htmlFor='option-one'>Option One</Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='option-two' id='option-two' />
          <Label htmlFor='option-two'>Option Two</Label>
        </div>
      </RadioGroup>

      <SaveProgress />

      <DropdownMenu>
        <DropdownMenuTrigger className='transition-all duration-300 hover:bg-russianViolet'>
          Dropdown
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ToastWithAction
        message='Error'
        title='Error message'
        actionText={"Retry"}
        actionIcon={<ShieldX size={15} />}
      />
      <ToastWithAction
        message='Success'
        title='Information Message'
        actionText={"Undo"}
        actionIcon={<Undo2 size={15} />}
      />
      <Card />
      <CommentBox />
    </div>
  );
}
