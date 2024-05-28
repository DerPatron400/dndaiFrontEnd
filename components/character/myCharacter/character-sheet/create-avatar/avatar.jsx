import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CustomButton from "@/components/ui/custom-button";
import Cancel from "@/components/ui/Icons/Cancel";
import Save from "@/components/ui/Icons/Save";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GenerateNew from "./generate-new";
import { cn } from "@/lib/utils";
import { IMAGE_STYLES } from "./constants";
import { handleGenerateAvatar, handleUpdateAvatar } from "@/actions/character";
import useUserStore from "@/utils/userStore";
const CurrentAvatarsList = ({
  avatars,
  selectedPortrait,
  setSelectedPortrait,
}) => {
  console.log(selectedPortrait);
  return (
    <div className={"flex gap-5 flex-col items-start p-6 pt-4"}>
      <span className='text-white running-text-large '>
        Change character portrait
      </span>
      <div className='grid grid-cols-12 w-full gap-5 min-h-96 max-h-[60vh] overflow-scroll hide-scrollbar justify-center '>
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className='col-span-4'
            onClick={() => {
              setSelectedPortrait(avatar);
            }}
          >
            <img
              src={avatar}
              alt='avatar'
              className={cn(
                "w-full h-[223px] cursor-pointer ease-animate rounded-[16px] ",
                avatar === selectedPortrait && "border-2 border-irisPurple"
              )}
            />
          </div>
        ))}

        {avatars.length === 0 && (
          <span className='text-white flex items-center justify-center running-text-mono uppercase col-span-12  w-full'>
            No avatars found
          </span>
        )}
      </div>
    </div>
  );
};
export default function Avatar({
  character,

  open,
  setOpen,
  avatars = [],
  payload,
}) {
  console.log(character);
  //get params
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const { user } = useUserStore();
  const generateAvatar = params.get("generateAvatar");
  const [style, setStyle] = useState(IMAGE_STYLES[0]);
  const [selectedPortrait, setSelectedPortrait] = useState(
    character?.personal?.portraitUrl
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedPortrait(character?.personal?.portraitUrl);
  }, [character]);

  const _handleGenerateAvatar = async () => {
    try {
      setIsLoading(true);
      payload.appearance += ",in " + style;

      const avatar = await handleGenerateAvatar(payload, user?.token);
    } catch (error) {
      console.log("error", error);
    } finally {
      console.log("here");
      setIsLoading(false);
    }
  };

  const _handleUpdateAvatar = async () => {
    try {
      const payload = {
        newSelection: selectedPortrait,
        id: character._id,
      };

      await handleUpdateAvatar(payload, user?.token);
    } catch (error) {}
  };
  const handleAvatarClick = () => {
    router.push(path + "?generateAvatar=true");
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(_open) => setOpen(_open)}
      className='bg-russianViolet !gap-0'
    >
      <DialogContent className='bg-[#1b1b31] !rounded-[16px] !p-0 flex-col !gap-0 border border-white/10  !min-w-[757px] '>
        {generateAvatar ? (
          <GenerateNew style={style} setStyle={setStyle} />
        ) : (
          <CurrentAvatarsList
            selectedPortrait={selectedPortrait}
            setSelectedPortrait={setSelectedPortrait}
            avatars={avatars}
          />
        )}

        <div
          className={cn(
            "p-6 border-t border-white/10 justify-between w-full flex items-center  ",
            generateAvatar && "justify-end"
          )}
        >
          <CustomButton
            variant={"primary"}
            onClick={() => {
              handleAvatarClick();
            }}
            withIcon={true}
            className={cn(generateAvatar && "hidden")}
          >
            Generate new portrait
            <div className='flex  items-center gap-1 '>
              (<img src='/gems/Legendary.png' className='p-0' />
              1)
            </div>
          </CustomButton>
          <div className='flex items-center gap-4'>
            <CustomButton
              onClick={() => {
                setOpen(false);
              }}
              disabled={isLoading}
              withIcon={true}
            >
              <Cancel className='w-5 h-5 opacity-70' fill={"white"} />
              Cancel
            </CustomButton>
            <CustomButton
              variant={"primary"}
              onClick={() => {
                _handleUpdateAvatar();
                setOpen(false);
              }}
              withIcon={true}
              disabled={avatars.length === 0}
              className={cn(generateAvatar && "hidden")}
            >
              <Save className='w-5 h-5 ' fill={"#0A0A21"} />
              Save
            </CustomButton>

            <CustomButton
              variant={"primary"}
              onClick={() => {
                _handleGenerateAvatar();
              }}
              disabled={isLoading}
              withIcon={true}
              className={cn(!generateAvatar && "hidden")}
            >
              {isLoading ? (
                "Generating..."
              ) : (
                <>
                  Generate
                  <div className='flex  items-center gap-1 '>
                    (<img src='/gems/Legendary.png' className='p-0' />
                    1)
                  </div>
                </>
              )}
            </CustomButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
